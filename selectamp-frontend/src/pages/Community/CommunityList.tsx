import PageTemplete from '../../components/Base/PageTemplete';
import CommunityBoard from '../../components/Community/CommunityBoard';
import { ConfigType, PageModeType } from '../../store/modules/config';

export type CommunityListProps = {
  page: number,
  config: ConfigType | null,
  onSetCommunityPageMode: (mode: PageModeType) => void
};

export default function CommunityList({ page = 1, config, onSetCommunityPageMode }: CommunityListProps) {
  return (
    <PageTemplete>
      <CommunityBoard page={page} />
    </PageTemplete>
  );
};

