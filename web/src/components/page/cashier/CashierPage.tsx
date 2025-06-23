'use client';

import { updateOrderAction } from '@/app/actions/orders';
import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import { ORDER_STATUS, OrderStatus } from '@raffle-tracker/dto';
import { useState } from 'react';
import { FaBan, FaXmark } from 'react-icons/fa6';

export default function CashierPage() {
  const [error, setError] = useState<string | null>(null);
  const [orderAction, setOrderAction] = useState<OrderStatus | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);

  const {
    formState: { errors },
    getValues,
    isInitialized,
    register,
    trigger,
  } = useInitializedForm<{ orderId: string }>({
    mode: 'onBlur',
  });

  const handleAction = async (status: OrderStatus) => {
    setError(null);
    setResults([]);

    const isValid = await trigger();
    if (!isValid) {
      return;
    }

    setOrderAction(status);
    setOrderNumber(getValues('orderId'));

    const orderId = parseInt(getValues('orderId'));
    try {
      const response = await updateOrderAction(orderId, status);
      setResults(response.refs);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please contact an administrator.'
      );
    }
  };

  const ResultsGrid = () => {
    return (
      <div className={styles.resultsGrid}>
        {orderAction === ORDER_STATUS.CANCELLED && (
          <p>Order {orderNumber} has been cancelled.</p>
        )}
        {orderAction === ORDER_STATUS.REFUNDED && (
          <p>Order {orderNumber} has been refunded.</p>
        )}
        {orderAction === ORDER_STATUS.REDEEMED && results.length > 0 && (
          <p>
            Order <span className={styles.orderResult}>{orderNumber}</span>{' '}
            contains no winning ref numbers.
          </p>
        )}

        {orderAction === ORDER_STATUS.REDEEMED && results.length > 0 && (
          <>
            <p>
              Order <span className={styles.orderResult}>{orderNumber}</span>{' '}
              contains{' '}
              <span className={styles.orderResult}>{results.length}</span>{' '}
              winning numbers:
            </p>
            {results.map((result, index) => (
              <div key={index}>{result}</div>
            ))}
          </>
        )}
      </div>
    );
  };

  return (
    <Card title="Cashier">
      {error && <p className={styles.error}>{error}</p>}
      {isInitialized ? (
        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <LabeledField
            label="Order ID:"
            htmlFor="orderId"
            error={errors.orderId?.message}
          >
            <Input
              id="orderId"
              maxLength={5}
              {...register('orderId', {
                minLength: {
                  value: 5,
                  message: 'Order ID must be 5 digits',
                },
                maxLength: {
                  value: 5,
                  message: 'Order ID must be 5 digits',
                },
                required: 'Order ID is required',
                pattern: {
                  value: /^\d+$/,
                  message: 'Order ID must contain only numbers',
                },
              })}
            ></Input>
          </LabeledField>
          <div className={styles.buttonContainer}>
            <SimpleButton
              title="Redeem"
              onClick={() => {
                handleAction(ORDER_STATUS.REDEEMED);
              }}
            >
              Redeem
            </SimpleButton>
            <IconButton
              className={styles.iconButton}
              title="Refund"
              onClick={() => {
                handleAction(ORDER_STATUS.REFUNDED);
              }}
            >
              <FaBan />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              title="Cancel"
              onClick={() => {
                handleAction(ORDER_STATUS.CANCELLED);
              }}
            >
              <FaXmark />
            </IconButton>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}

      {!error && <ResultsGrid />}
    </Card>
  );
}

const styles = {
  buttonContainer: 'flex gap-2 justify-end',
  error: 'text-red-500 mb-4',
  form: 'flex flex-col gap-2',
  iconButton: 'bg-light-accent2',
  orderResult: 'font-bold',
  resultsGrid: 'mt-4 flex flex-col gap-2',
};
