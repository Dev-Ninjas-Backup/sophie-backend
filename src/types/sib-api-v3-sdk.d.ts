declare module 'sib-api-v3-sdk' {
  export class ApiClient {
    static instance: ApiClient;
    authentications: {
      'api-key': {
        apiKey: string;
      };
    };
  }

  export class TransactionalEmailsApi {
    sendTransacEmail(emailData: {
      sender: {
        email: string;
        name: string;
      };
      to: Array<{
        email: string;
        name?: string;
      }>;
      subject: string;
      htmlContent: string;
    }): Promise<any>;
  }
}