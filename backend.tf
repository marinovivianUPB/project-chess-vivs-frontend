terraform {
 backend "s3" {
   bucket         = "chess-mentor-vivs-frontend-block"
   key            = "global/s3/terraform.tfstate"
   region         = "us-east-1"
   dynamodb_table = "chess-mentor-vivs-frontend-block"
   encrypt        = true
 }
}