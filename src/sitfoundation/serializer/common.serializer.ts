import { BaseSerializer } from '../../app.serializer';

export class CommonSerializer extends BaseSerializer {
  constructor(
    statusCode: number,
    message: string,
    data: any,
    errors: any,
    optional?: Record<string, unknown>,
  ) {
    super(statusCode, message, data, errors);
  }
}
