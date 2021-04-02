import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { RootStateType } from '../../store/modules';
import { setCommunityPageMode, PageModeType } from '../../store/modules/config'
import Community from '../../pages/Community';

export default function CommunityContainer({ location }: RouteComponentProps) {
  const { page } = queryString.parse(location.search);
  const dispatch = useDispatch();

  const config = useSelector((state: RootStateType) => state.config);

  const onSetCommunityPageMode = (mode: PageModeType) => { dispatch(setCommunityPageMode(mode)) };

  return (
    <Community
      page={page ? Number(page) : 1}
      config={config}
      onSetCommunityPageMode={onSetCommunityPageMode} />
  );
}