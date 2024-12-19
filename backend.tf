terraform {
 backend "s3" {
   bucket         = "chess-mentor-frontend-vivs-block"
   key            = "global/s3/terraform.tfstate"
   region         = "us-east-1"
   dynamodb_table = "chess-mentor-frontend-vivs-block"
   encrypt        = true
 }
}