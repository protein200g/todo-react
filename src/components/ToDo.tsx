import { Categories, IToDo } from '../atoms';
import { toDoState, categorySa } from '../atoms';
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from 'recoil';

function ToDo({ text, category, id }: IToDo) {
  const [cats, setCats] = useRecoilState(categorySa);
  const setToDos = useSetRecoilState(toDoState);
  const delteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(
        (todo) => todo.id === id
      );
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onClick2 = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(
        (toDo) => toDo.id === id
      );
      const oldToDo = oldToDos[targetIndex];
      const newToDo = {
        text,
        id,
        category: name,
      };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {cats?.map(
        (cat) =>
          category !== cat.name && (
            <button
              key={cat.id}
              name={cat.name}
              onClick={onClick2}
            >
              {cat.name}
            </button>
          )
      )}
      <button onClick={delteToDo}>delete</button>
    </li>
  );
}

export default ToDo;
