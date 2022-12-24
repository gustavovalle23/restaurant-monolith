import { OrderOutput } from '../dto';

export class FindAllOrdersUseCase {
  execute(): Output {
    return [];
  }
}

type Output = OrderOutput[];
