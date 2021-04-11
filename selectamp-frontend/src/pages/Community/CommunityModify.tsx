import { RouteComponentProps } from 'react-router';
import PageTemplete from '../../components/Base/PageTemplete';
import CommunityModifier from '../../components/Community/CommunityModifier';

interface MatchParams {
  id: string
}

export type CommunityModifyProps = { };

export default function CommunityModify({ match }: RouteComponentProps<MatchParams>) {
  const { id } = match.params;

  return (
    <PageTemplete>
      <CommunityModifier id={id} />
    </PageTemplete>
  );
};

