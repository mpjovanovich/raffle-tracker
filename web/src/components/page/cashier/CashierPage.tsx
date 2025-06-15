'use client';

import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import { Event } from '@raffle-tracker/dto';
import { FaBan, FaXmark } from 'react-icons/fa6';

interface CashierPageProps {
  event: Event;
}

export default function CashierPage({ event }: CashierPageProps) {
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
          <IconButton
            className={styles.iconButton}
            title="Refund"
            onClick={() => {}}
          >
            <FaBan />
          </IconButton>
          <IconButton
            className={styles.iconButton}
            title="Cancel"
            onClick={() => {}}
          >
            <FaXmark />
          </IconButton>
        </div>
      </form>
    </Card>
  );
}

const styles = {
  form: 'flex flex-col gap-2',
  iconButton: 'bg-light-accent2',
  buttonContainer: 'flex gap-2 justify-end',
};
