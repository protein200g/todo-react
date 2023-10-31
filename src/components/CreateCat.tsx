import { useRecoilState, useSetRecoilState } from 'recoil';
import { ICategories, categorySa } from '../atoms';
import { useForm } from 'react-hook-form';

interface ICat {
  cat: string;
}

function CreateCat() {
  const [cats, setCategories] = useRecoilState(categorySa);
  const { register, handleSubmit, setValue } =
    useForm<ICat>();
  const onSubmit = ({ cat }: ICat) => {
    setCategories((oldCat) => [
      ...oldCat,
      { name: cat, id: Date.now() },
    ]);
    setValue('cat', '');
    console.log(cats);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('cat', { required: true })}
        placeholder="Add your category"
      />
      <button>Add Category</button>
    </form>
  );
}

export default CreateCat;
