import { createPostAction } from '@/actions/posts/createPostAction';
import { TCountry } from '@/lib/types/county';
import SelectInput, {
  Option,
} from '@/components/units/ServerActionForm/SelectInput';
import ServerActionForm from '@/components/units/ServerActionForm';
import Input from '@/components/units/ServerActionForm/Input';
import Textarea from '@/components/units/ServerActionForm/Textarea';
import ImageUploader from '@/components/units/ServerActionForm/ImageUploader';
import SubmitButton from '@/components/units/ServerActionForm/SubmitButton';

export default function CreatePostForm({
  countries,
}: {
  countries: TCountry[] | null;
}) {
  const options: Option[] = (countries ?? []).map((c) => ({
    label: c.name,
    value: c.name,
  }));

  return (
    <div className="text-center flex flex-col items-center py-10">
      <h3 className="text-4xl text-gray-700 font-semibold mb-6">
        Create New Post
      </h3>
      <ServerActionForm
        action={createPostAction}
        className="space-y-4 w-full max-w-lg"
      >
        <Input
          name="title"
          label="Title"
          required
          placeholder="Enter post title"
        />
        <SelectInput
          name="country"
          label="Country"
          options={options}
          placeholder="Select country"
        />
        <Input
          name="duration"
          label="Duration"
          type="text"
          required
          placeholder='Enter duration (e.g. "5 days" або "2w")'
          title='Приклад: "5 days" або "2w"'
        />
        <Input
          name="impression"
          label="Impression Score"
          type="range"
          min={0}
          max={10}
          step={1}
          defaultValue={0}
        />
        <Input
          name="approximateCost"
          label="Approximate Cost ($)"
          type="range"
          min={0}
          max={50000}
          step={100}
          defaultValue={0}
        />
        <Textarea
          name="description"
          label="Description"
          required
          placeholder="Enter description"
          rows={5}
        />
        <div className="text-left">
          <label className="text-sm font-medium">Images</label>
          <ImageUploader name="images" multiple max={10} />
        </div>
        <SubmitButton>Create Post</SubmitButton>
      </ServerActionForm>
    </div>
  );
}
