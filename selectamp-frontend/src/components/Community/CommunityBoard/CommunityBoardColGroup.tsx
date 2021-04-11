export type CommunityBoardColGroupProps = {};

export default function CommunityBoardColGroup({ }: CommunityBoardColGroupProps) {
  return (
    <colgroup>
      <col style={{"width": "96px"}} />
      <col style={{"width": "128px"}} />
      <col style={{"width": "auto"}} />
      <col style={{"width": "36px"}} />
      <col style={{"width": "256px"}} />
      <col style={{"width": "96px"}} />
    </colgroup>
  );
};