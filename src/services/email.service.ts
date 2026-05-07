import { PublishCommand } from "@aws-sdk/client-sns";
import { sns } from "../config/aws";

export const sendEmail = async (
 subject: string,
 message: string
) => {

 const command = new PublishCommand({
  TopicArn: process.env.SNS_TOPIC!,
  Subject: subject,
  Message: message
 });

 await sns.send(command);
};
