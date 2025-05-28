'use client';

import Card from '@/app/ui/Card';
import ItemList from '@/app/ui/ItemList';
import ItemListItem from '@/app/ui/ItemListItem';
import LabeledField from '@/app/ui/LabeledField';
import Input from '@/app/ui/Input';
import clsx from 'clsx';

export default function RacesGrid() {
  return (
    <div className="border-2 border-light-accent2 rounded-sm m-6">
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
        <div className="flex-1">
          <p>Add</p>
        </div>
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
    'px-8'
  ),
  raceAddLabeledField: clsx('flex-row', 'items-center', 'm-2', 'justify-end'),
  raceAddLabeledFieldNumber: clsx('w-1/4', 'ml-8'),
};
