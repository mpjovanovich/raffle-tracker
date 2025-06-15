import Card from '@/app/ui/Card';
import Input from '@/app/ui/Input';
import LabeledField from '@/app/ui/LabeledField';
import SimpleButton from '@/app/ui/SimpleButton';
import { getEvent } from '@/services/eventService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { eventId: string };
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);
  if (isNaN(eventIdNumber)) {
    notFound();
  }
  const event = await getEvent(eventIdNumber, true);
  if (!event) {
    notFound();
  }

  return (
    <Card title="Cashier">
      <form
        className={styles.form}
        // onSubmit={e => {
        //   e.preventDefault();
        //     handleSubmit(onTicketAdd)(e);
        // }}
      >
        <LabeledField
          label="Order ID:"
          htmlFor="orderId"
          //   className={styles.itemAddLabeledField}
          //   error={errors.contestId?.message}
        >
          <Input
            id="orderId"
            // className={styles.itemAddLabeledFieldNumber}
            // {...register('contestId', {
            //   required: 'Contest number is required',
            //   valueAsNumber: true,
            // })}
          ></Input>
        </LabeledField>
        <div className={styles.buttonContainer}>
          <SimpleButton type="submit">Redeem</SimpleButton>
          {/* TODO: icon button refund */}
          {/* TODO: icon button cancel  */}
        </div>
      </form>
    </Card>
  );
}

const styles = {
  form: 'flex flex-col gap-2',
  buttonContainer: 'flex gap-2 justify-end',
};
