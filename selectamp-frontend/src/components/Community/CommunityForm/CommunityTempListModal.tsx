import { css } from '@emotion/react';
import dateFormat from 'dateformat';
import { stringShorthand } from '../../Utils/Utils';
import { API } from '../../axios';
import Modal from 'react-modal';

export type CommunityTempListModalProps = {
  contents: string,
  modalIsOpen: boolean,
  tempCommunities?: Array<any>,
  onSetContents: (contents: string) => void,
  onSetCommunity: (commmunity: any) => void,
  onSetModalIsOpen: (modalIsOpen: boolean) => void,
  onSetTempCommunities: (tempCommunities: Array<any>) => void
};

export default function CommunityTempListModal({ contents, modalIsOpen, tempCommunities, onSetContents, onSetCommunity, onSetModalIsOpen, onSetTempCommunities }: CommunityTempListModalProps) {

  const handleCommunityButton = (e: React.MouseEvent<HTMLElement>) => {
    (async () => {
      let target = (e.target as HTMLElement);
      if (target.tagName != "BUTTON" && target.parentElement?.tagName == "BUTTON") target = target.parentElement;
      const id = Number(target.dataset.id);
      
      const loadCommunity = tempCommunities?.filter(item => item.id == id)[0];
  
      loadCommunity && onSetCommunity(loadCommunity);
      loadCommunity && onSetContents(loadCommunity.contents);
  
      const url = `/api/community/${id}/`;
      await API.delete(url).then(response => {
        if (response.data.success) {
          tempCommunities && onSetTempCommunities(tempCommunities.filter(item => item.id != id));
        }
      });
      onSetModalIsOpen(false);

    })();
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLElement>) => {
    const target = (e.target as HTMLElement);
    const id = target.dataset.id;
    const url = `/api/community/${id}/`;
    API.delete(url).then(response => {
      if (response.data.success) {
        tempCommunities && onSetTempCommunities(tempCommunities.filter(item => item.id != id));
      }
    });
  };

  return (
    <div>
      <Modal
        appElement={document.body}
        isOpen={modalIsOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => {}}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            position: 'absolute',
            width: "30rem",
            zIndex: 1100,
            top: '40px',
            left: '50%',
            bottom: '40px',
            transform: "translateX(-50%)",
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        contentLabel="Temp community post list">  
        <div css={communityTempListModalStyle}>
          <h2>임시저장 목록</h2>
          <ul className="tempCommunities">
            {
              tempCommunities
              ? tempCommunities.map((item, index) => <li className="tempCommunitiesItem" key={index}>
                <button
                  className="commmunity-button"
                  data-id={item.id}
                  onClick={handleCommunityButton}>
                  <b>{stringShorthand(item.title, 15)}</b> &nbsp;
                  ({dateFormat(item.createAt, "yyyy -mm-dd HH:MM:ss")})
                </button>
                <button className="delete-button" data-id={item.id} onClick={handleDeleteButton}>X</button>
              </li>)
              : null
            }
          </ul>
          <button className="modalCloseButton"onClick={() => {
            onSetModalIsOpen(false);
          }}>닫기</button>
        </div>
      </Modal>
    </div>
  );
};

const communityTempListModalStyle = css`
  position: relative;

  .tempCommunities {
    list-style: none;
    padding: 0;

    .tempCommunitiesItem {
      height: 2rem;
      line-height: 2rem;
      cursor: pointer;
      
      button.commmunity-button {
        border: none;
        background: none;
        cursor: pointer;

        &:focus {
          outline: none;
        }

        &:hover {
          b {
            color: #777;
          }
        }

        b {
          font-size: 1rem;
        }
      }

      button.delete-button {
        border: none;
        background: none;
        color: red;
        font-size: 0.725rem;
        line-height: 2rem;
        cursor: pointer;
        display: none;
      }

      &:hover {
        button.delete-button {
          display: inline-block;
        }
      }
    }
  }

  .modalCloseButton {
    border: 1px solid #777;
    cursor: pointer;
    width: 100%;
    padding: 0.5rem 0;
    background: none;
    position: absolute;
  }
`;