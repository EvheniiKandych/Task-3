import { MissionCard } from './MissionCard';
import styles from './MissionGrid.module.css';

export function MissionGrid({
  missions,
  agencyMap,
  instrumentMap,
  onRequestDelete,
}) {
  return (
    <div className={styles.grid}>
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          agencyName={agencyMap[mission.agencyId]?.name || mission.agencyId}
          instrumentMap={instrumentMap}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </div>
  );
}
