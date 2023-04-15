import { FieldUpdater } from '@/@seedwork';
import { User, UserProperties } from '../entities';


export class PhoneUpdater extends FieldUpdater<User, UserProperties> {
  protected doUpdate(props: UserProperties, phone: string): void {
    props.phone = phone;
    props.updatedAt = new Date();
  }
}
