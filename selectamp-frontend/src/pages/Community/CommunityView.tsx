import { RouteComponentProps } from 'react-router';
import PageTemplete from '../../components/Base/PageTemplete';
import CommunityViewer from '../../components/Community/CommunityViewer'

interface MatchParams {
  id: string
}

export type CommunityViewProps = { };

export default function CommunityView({ match }: RouteComponentProps<MatchParams>) {
  const { id } = match.params;

  return (
    <PageTemplete>
      <CommunityViewer id={id} />
    </PageTemplete>
  );
};

