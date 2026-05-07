import { SQSClient } from "@aws-sdk/client-sqs";
import { SNSClient } from "@aws-sdk/client-sns";

export const sqs = new SQSClient({
  region: process.env.AWS_REGION,
});

export const sns = new SNSClient({
  region: process.env.AWS_REGION,
});
