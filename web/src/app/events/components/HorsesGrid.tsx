'use client';

import Card from '@/app/ui/Card';
import IconButton from '@/app/ui/IconButton';
import ItemList from '@/app/ui/ItemList';
import ItemListItem from '@/app/ui/ItemListItem';
import clsx from 'clsx';
// import { addHorses, deleteHorse } from '@/services/events';
import { useInitializedForm } from '@/app/hooks/useInitializedForm';
import { Horse, Race } from '@horse-race-raffle-tracker/dto';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

interface HorsesGridProps {
  race: Race;
}

export default function HorsesGrid({ race }: HorsesGridProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const maxHorseNumber =
    race.horses?.reduce(
      (max, horse) => (horse.number > max ? horse.number : max),
      1
    ) ?? 1;

  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
    setValue,
  } = useInitializedForm<Omit<Horse, 'id'>>({
    defaultValues: {
      number: maxHorseNumber + 1,
      raceId: race.id,
      winner: 0,
      scratch: 0,
    },
    mode: 'onBlur',
  });

  // // Whenever new horses are added and the component is re-rendered,
  // // the horse number should be set to the highest horse number + 1.
  // useEffect(() => {
  //   setValue('horseNumber', maxHorseNumber + 1);
  // }, [maxHorseNumber, setValue]);

  // const onSubmit = async (data: CreateHorsesRequest) => {
  //   try {
  //     setIsSaving(true);
  //     setError(null);
  //     await addHorses(event.id, data.horseNumber, data.numberOfHorses);
  //     router.push(`/events/${event.id}`);
  //   } catch (error) {
  //     setError(
  //       error instanceof Error
  //         ? error.message
  //         : 'An error occurred. Please contact an administrator.'
  //     );
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  const handleDeleteHorse = async (horse: Horse) => {
    if (confirm(`Are you sure you want to delete Horse ${horse.number}?`)) {
      try {
        // await deleteHorse(event.id, horse.id);
        // router.push(`/events/${event.id}`);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'An error occurred. Please contact an administrator.'
        );
      }
    }
  };

  // interface DeleteButtonProps {
  //   horse: Horse;
  // }
  // const DeleteButton = ({ horse }: DeleteButtonProps) => {
  //   return (
  //     <IconButton
  //       title="Delete"
  //       onClick={() => {
  //         handleDeleteHorse(horse);
  //       }}
  //     >
  //       <FaXmark />
  //     </IconButton>
  //   );
  // };

  //   const HorseAdd = () => {
  //     return (
  //       <form
  //         className={styles.horseAdd}
  //         onSubmit={e => {
  //           e.preventDefault();
  //           handleSubmit(onSubmit)(e);
  //         }}
  //       >
  //         <LabeledField
  //           label="Horse Number:"
  //           htmlFor="horseNumber"
  //           className={styles.horseAddLabeledField}
  //           error={errors.horseNumber?.message}
  //         >
  //           <Input
  //             type="number"
  //             id="horseNumber"
  //             className={styles.horseAddLabeledFieldNumber}
  //             {...register('horseNumber', {
  //               required: 'Horse number is required',
  //               min: {
  //                 value: 1,
  //                 message: 'Horse number must be at least 1',
  //               },
  //               valueAsNumber: true,
  //             })}
  //           />
  //         </LabeledField>
  //         <LabeledField
  //           label="Number of Horses:"
  //           htmlFor="numberOfHorses"
  //           className={styles.horseAddLabeledField}
  //           error={errors.numberOfHorses?.message}
  //         >
  //           <Input
  //             type="number"
  //             id="numberOfHorses"
  //             className={styles.horseAddLabeledFieldNumber}
  //             {...register('numberOfHorses', {
  //               required: 'Number of horses is required',
  //               min: {
  //                 value: 1,
  //                 message: 'Number of horses must be at least 1',
  //               },
  //               valueAsNumber: true,
  //             })}
  //           />
  //         </LabeledField>
  //         <SimpleButton
  //           className={styles.horseAddButton}
  //           type="submit"
  //           disabled={isSaving}
  //         >
  //           Add
  //         </SimpleButton>
  //       // </form>
  //     );
  //   };

  return (
    <div className={styles.horseContainer}>
      <Card title="Horses">
        {error && <p className={styles.error}>{error}</p>}
        {isInitialized ? (
          <ItemList>
            {race.horses?.map(horse => (
              <ItemListItem key={horse.id}>
                <span>Horse {horse.number}</span>
                <div className={styles.actionButtonContainer}>
                  <IconButton
                    title="Delete"
                    onClick={() => {
                      handleDeleteHorse(horse);
                    }}
                  >
                    <FaXmark />
                  </IconButton>
                </div>
              </ItemListItem>
            ))}
          </ItemList>
        ) : (
          <div>Loading...</div>
        )}
      </Card>
      {/* <HorseAdd /> */}
    </div>
  );
}

const styles = {
  actionButtonContainer: clsx('flex', 'flex-row', 'gap-1'),
  error: clsx('text-red-500'),
  horseAdd: clsx(
    'border-t-2',
    'border-light-accent2',
    'flex',
    'flex-row',
    'gap-4',
    'px-8'
  ),
  horseAddButton: clsx('my-2', 'h-fit'),
  horseAddLabeledField: clsx('flex-row', 'items-center', 'justify-end', 'm-0'),
  horseAddLabeledFieldNumber: clsx('w-1/4'),
  horseContainer: clsx('border-2', 'border-light-accent2', 'rounded-sm', 'm-6'),
};
