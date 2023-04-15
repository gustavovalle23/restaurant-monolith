import { FieldUpdater } from '@/@seedwork';
import { User, UserProperties } from '../entities';

export class EmailUpdater extends FieldUpdater<User, UserProperties> {
  protected doUpdate(props: UserProperties, email: string): void {
    props.email = email;
    props.updatedAt = new Date();
  }
}
