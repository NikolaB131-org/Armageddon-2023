import { fetchAsteroid } from '@/api/fetchAsteroid';
import Error from '@/components/Error';
import DynamicSelectText from '@/components/DynamicSelectText';
import CloseApproaches from '@/components/CloseApproaches';
import styles from './page.module.css';

type Params = {
  params: { id: string };
};

export async function generateMetadata({ params }: Params) {
  const asteroid = await fetchAsteroid(params.id); // не смотря на то, что таких фетча 2, запрос будет только 1
  if (asteroid) {
    return { title: `${asteroid.name} | Armageddon 2023` };
  }
}

async function Page({ params }: Params) {
  const asteroid = await fetchAsteroid(params.id);
  if (!asteroid) return <Error message='Астероид с указанным id не найден!' />;

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>{asteroid.name}</h1>
        {asteroid.isHazardous && <span>⚠️ Опасен</span>}
      </header>
      <DynamicSelectText
        title='Диаметр: '
        items={[
          { text: 'км', value: `${asteroid.diameter.kilometers.min.toFixed(2)} – ${asteroid.diameter.kilometers.max.toFixed(2)}` },
          { text: 'м', value: `${Math.round(asteroid.diameter.meters.min)} – ${Math.round(asteroid.diameter.meters.max)}` },
          { text: 'миль', value: `${asteroid.diameter.miles.min.toFixed(3)} – ${asteroid.diameter.miles.max.toFixed(3)}` },
          { text: 'футов', value: `${Math.round(asteroid.diameter.feet.min)} – ${Math.round(asteroid.diameter.feet.max)}` },
        ]}
      />
      <p>Абсолютная звёздная величина:&nbsp;{asteroid.absoluteMagnitude}</p>
      <CloseApproaches approaches={asteroid.closeApproaches} />
    </div>
  );
}

export default Page;
