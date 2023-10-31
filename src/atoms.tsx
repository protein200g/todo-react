import exp from 'constants';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export interface ICategories {
  name: string;
  id: number;
}

export const categorySa = atom<ICategories[]>({
  key: 'addcategory',
  default: [
    { name: 'TO_DO', id: 1 },
    { name: 'DOING', id: 2 },
    { name: 'DONE', id: 3 },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter(
      (toDo) => toDo.category === category
    );
  },
});
