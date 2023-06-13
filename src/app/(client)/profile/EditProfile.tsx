import PageSubtitle from '@/components/PageSubtitle';
import Button from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import { errors } from 'jose';
import React from 'react'
import Input from '@/components/ui/Input';

type Props = {}

const EditProfile = (props: Props) => {
    return (
        <section className='my-10'>
          <PageSubtitle className="text-green-600">
            Edit Profile
          </PageSubtitle>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="sm:w-[50%] grid grid-cols-1  gap-y-8 my-8"
          >
            <Label spanClassName="font-normal" name="Name">
              <Input
                // error={errors.name}
                placeholder="Suzan Rana"
                // {...register("name")}
              />
            </Label>
            <Label spanClassName="font-normal" name="Contact">
              <Input
                // error={errors.contact_number}
                type="number"
                placeholder="1234567890"
                // {...register("contact_number")}
              />
            </Label>
            <ButtonGroup>
              <Button type="submit" variant={"primary"}>
                Save
              </Button>
              <Button type="reset" variant={"outline"}>
                Clear
              </Button>
            </ButtonGroup>
          </form>
        </section>
      );
}

export default EditProfile