import ServerActionForm from '@/components/units/ServerActionForm';
import { updateUserAction } from '@/actions/user/updateUserAction';
import type { User } from '@prisma/client';
import Input from '@/components/elements/Input';
import ImageUploader from '../../units/ImageUploader';
import SubmitButton from '@/components/units/ServerActionForm/SubmitButton';
import DispatchOkEvent from '@/components/units/ServerActionForm/DispatchOkEvent';
import { UI_EVENTS } from '@/lib/constants/uiEvents';

export default function UserUpdateForm({ user }: { user: User }) {
  return (
    <ServerActionForm action={updateUserAction} className="space-y-4">
      <Input
        name="firstName"
        label="First Name"
        type="text"
        required
        defaultValue={user.firstName}
        placeholder="John"
      />
      <Input
        name="lastName"
        label="Last Name"
        type="text"
        required
        defaultValue={user.lastName}
        placeholder="Doe"
      />

      <div className="text-left">
        <label className="text-sm font-medium">Avatar</label>
        <ImageUploader name="avatar" max={1} />
      </div>
      <SubmitButton>Save</SubmitButton>
      <DispatchOkEvent eventName={UI_EVENTS.user.updated} />
    </ServerActionForm>
  );
}
