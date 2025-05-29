'use client';

import Card from '@/app/ui/Card';
import ItemList from '@/app/ui/ItemList';
import ItemListItem from '@/app/ui/ItemListItem';
import LabeledField from '@/app/ui/LabeledField';
import Input from '@/app/ui/Input';
import SimpleButton from '@/app/ui/SimpleButton';
import clsx from 'clsx';

export default function RacesGrid() {
  return (
    <div className={styles.raceContainer}>
      <Card title="Races">
        <ItemList>
          <ItemListItem>Stuff</ItemListItem>
        </ItemList>
      </Card>
      <div className={styles.raceAdd}>
        <LabeledField
          label="Race Number:"
          htmlFor="raceNumber"
          className={styles.raceAddLabeledField}
        >
          <Input
            type="number"
            id="raceNumber"
            className={styles.raceAddLabeledFieldNumber}
          />
        </LabeledField>
        <LabeledField
          label="Number of Horses:"
          htmlFor="numberOfHorses"
          className={styles.raceAddLabeledField}
        >
          <Input
            type="number"
            id="numberOfHorses"
            className={styles.raceAddLabeledFieldNumber}
          />
        </LabeledField>
        <SimpleButton className={styles.raceAddButton}>Add</SimpleButton>
      </div>
    </div>
  );
}

const styles = {
  raceAdd: clsx(
    'border-t-2',
    'border-light-accent2',
    'flex',
    'flex-row',
    'gap-4',
    'px-8'
  ),
  raceAddButton: clsx('my-2', 'h-fit'),
  raceAddLabeledField: clsx('flex-row', 'items-center', 'justify-end', 'm-0'),
  raceAddLabeledFieldNumber: clsx('w-1/4'),
  raceContainer: clsx('border-2', 'border-light-accent2', 'rounded-sm', 'm-6'),
};
