provider "aws" {
  region = "us-east-1"
}

# Random Suffix for Unique Bucket Name
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# S3 Bucket
resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "chess-mentor-${random_string.suffix.result}"

  tags = {
    Name        = "ChessMentorFrontend"
    Environment = "Production"
  }

  force_destroy = true  # Allow Terraform to delete the bucket even if it's not empty
}

resource "aws_s3_bucket_public_access_block" "frontend_access_block" {
  bucket                  = aws_s3_bucket.frontend_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 Bucket Website Configuration
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.frontend_bucket.id

  index_document {
    suffix = "index.html"
  }
}

# Public Access Policy for S3 Bucket
resource "aws_s3_bucket_policy" "public_access" {
  bucket = aws_s3_bucket.frontend_bucket.id

  policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.frontend_bucket.arn}/*"
      },
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:PutObject",
        Resource  = "${aws_s3_bucket.frontend_bucket.arn}/*"
      }
    ]
  })
}

# Upload Static Files to S3
resource "aws_s3_object" "frontend_files" {
  for_each = fileset("dist", "**/*")

  bucket = aws_s3_bucket.frontend_bucket.id
  key    = each.value          
  source = "dist/${each.value}"
  etag   = filemd5("dist/${each.value}")

  content_type = lookup(
    {
      ".html" = "text/html",
      ".css"  = "text/css",
      ".js"   = "application/javascript",
      ".svg"  = "image/svg+xml",
      ".png"  = "image/png"
    },
    regex("\\.[^.]*$", each.value), # Matches the file extension
    "application/octet-stream"      # Default MIME type for unknown extensions
  )
}

# Outputs for Website
output "bucket_name" {
  value = aws_s3_bucket.frontend_bucket.bucket
}

output "website_url" {
  value = aws_s3_bucket_website_configuration.website.website_endpoint
}
