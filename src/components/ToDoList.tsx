import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import {
  Categories,
  ICategories,
  categoryState,
  toDoSelector,
  toDoState,
} from '../atoms';
import ToDo from './ToDo';
import CreateCat from './CreateCat';
import { categorySa } from '../atoms';
import Cat from './Cat';

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [cats, setCats] = useRecoilState(categorySa);
  const [category, setCategory] =
    useRecoilState(categoryState);
  const onInput = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select onInput={onInput}>
        {cats?.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <CreateCat />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      {/* <hr />
      <div> - Category List - </div>
      <div>Please click button you want to delete! </div>
      {cats && cats.length > 0 && (
        <Cat key={cats[0].id} {...cats[0]} />
      )} */}
    </div>
  );
}
export default ToDoList;
