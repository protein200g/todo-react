import { useRecoilState } from 'recoil';
import { ICategories, categorySa } from '../atoms';

function Cat({ name, id }: ICategories) {
  const [cats, setCats] = useRecoilState(categorySa);

  const delteCat = () => {
    setCats((oldCats) => {
      const targetIndex = oldCats.findIndex(
        (cat) => cat.id === id
      );
      if (targetIndex === -1) {
        return oldCats; // 대상이 없으면 상태 변경 없이 반환
      }

      const targetName = oldCats[targetIndex].name;
      const result = window.confirm(
        `${targetName}을 삭제하시겠습니까?`
      );
      if (result) {
        return [
          ...oldCats.slice(0, targetIndex),
          ...oldCats.slice(targetIndex + 1),
        ];
      } else {
        return oldCats; // 삭제를 취소한 경우 상태 변경 없이 반환
      }
    });
  };

  return (
    <div>
      {cats?.map((cat) => (
        <button key={cat.id} value={cat.name}>
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default Cat;
