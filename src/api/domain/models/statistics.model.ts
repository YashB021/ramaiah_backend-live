import { AppDataSource } from "../../config/db";
import { Statistic } from "../entities/statistics.entities";
import { StatisticDto } from "../responseDto/response.dto";

const statisticRepositoy = AppDataSource.getRepository(Statistic);
export const updateStatistics = async (
  statisticsData: StatisticDto[],
  contentBlockId: number
) => {
  try {
    const existingStats = await statisticRepositoy.find({
      where: { content_block_id: contentBlockId },
    });

    const existingIds = existingStats.map(s => s.id);
    console.log("Existing IDs:", existingIds);
    const incomingIds = statisticsData.filter(s => s.id).map(s => s.id);
    console.log("Incoming IDs:", incomingIds);
    // ✅ Delete stats that exist in DB but not in incoming data
    const idsToDelete = existingIds.filter(id => !incomingIds.includes(id));
    if (idsToDelete.length > 0) {
      await statisticRepositoy.delete(idsToDelete);
    }

    for (const stat of statisticsData) {
      let statistic: Statistic | null;

      if (stat.id) {
        // ✅ Update existing
        statistic = await statisticRepositoy.findOneBy({ id: stat.id });
        if (!statistic) {
          // If somehow not found, create fresh
          statistic = new Statistic();
          statistic.content_block_id = contentBlockId;
        }
      } else {
        // ✅ New record
        statistic = new Statistic();
        statistic.content_block_id = contentBlockId;
      }

      if(stat.number) statistic.number = stat.number;
      if(stat.label) statistic.label = stat.label;
      if(stat.statistic_text) statistic.statistic_text = stat.statistic_text;
      if(stat.suffix) statistic.suffix = stat.suffix;
      if(stat.icon_class) statistic.icon_class = stat.icon_class;
      if(stat.color) statistic.color = stat.color;
      if(stat.animation_delay) statistic.animation_delay = stat.animation_delay;

      await statisticRepositoy.save(statistic);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  }
};