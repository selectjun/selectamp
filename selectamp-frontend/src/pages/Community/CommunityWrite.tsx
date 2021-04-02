import PageTemplete from '../../components/Base/PageTemplete';
import CommunityWriter from '../../components/Community/CommunityWriter';

export type CommunityWriteProps = { };

export default function CommunityWrite({ }: CommunityWriteProps) {
  return (
    <PageTemplete>
      <CommunityWriter />
    </PageTemplete>
  );
};

