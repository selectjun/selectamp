export type CommunityContentsProps = {
  contents: string
};

export default function CommunityContents({ contents }: CommunityContentsProps) {
  return (
    <div className="post-contents">{contents}</div>
  );
};