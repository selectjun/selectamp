export type CommunityBoardColgroupProps = {}

export default function CommunityBoardColgroup({}: CommunityBoardColgroupProps) {
  return (
    <colgroup>
      <col style={{"width": "96px"}} />
      <col style={{"width": "36px"}} />
      <col style={{"width": "auto"}} />
      <col style={{"width": "36px"}} />
      <col style={{"width": "256px"}} />
      <col style={{"width": "64px"}} />
    </colgroup>
  );
};