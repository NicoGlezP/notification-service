import {ReceiveMessageCommand, DeleteMessageCommand} from "@aws-sdk/client-sqs";
import { sqs } from "../config/aws";
import { sendEmail } from "../services/email.service";

export const startConsumer = async () => {

  console.log("SQS Consumer iniciado");

  while (true) {

    try {

      const response = await sqs.send(
        new ReceiveMessageCommand({
          QueueUrl: process.env.SQS_QUEUE_URL!,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 20,
        })
      );

      const messages = response.Messages || [];

      for (const message of messages) {

        if (!message.Body) continue;

        const body = JSON.parse(message.Body);

        console.log("Mensaje recibido:", body);

        await sendEmail(
          `Nueva nota creada ${body.folio}`,
          `
          Se ha generado una nueva nota.

          Folio: ${body.folio}

          Descargar:
          ${body.downloadLink}
          `
        );

        await sqs.send(
          new DeleteMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL!,
            ReceiptHandle: message.ReceiptHandle!,
          })
        );

        console.log("Mensaje procesado y eliminado");
      }

    } catch (error) {

      console.error("Error en consumer:", error);
    }
  }
};
