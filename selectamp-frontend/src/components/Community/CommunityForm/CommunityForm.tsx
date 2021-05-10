import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import  CommunityTempListModal from './CommunityTempListModal';
import { API } from '../../axios';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export type CommunityKindsCodeNameType = {
  name: string,
  description: string
};

export type CommunityType = {
  id?: number,
  communityKindsCodeName: string,
  title: string,
  contents: string,
  viewCount?: number,
  isTemp: boolean,
  userId: string,
  createAt: Date | undefined,
  updateAt: Date | undefined
};

export type CommunityFormProps = { };

export default function CommunityForm({}: CommunityFormProps) {
  const [community, setCommunity] = useState<CommunityType>({
    communityKindsCodeName: "",
    title: "",
    contents: "",
    viewCount: 0,
    isTemp: false,
    userId: "",
    createAt: undefined,
    updateAt: undefined
  });
  const [contents, setContents] = useState<string>("");
  const history = useHistory();
  const titleRef = useRef<HTMLInputElement>(null);
  const communityKindsCodeNameRef = useRef<HTMLSelectElement>(null);
  const contentsRef  = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<SunEditor>(null);
  const [tempCommunities, setTempCommunities] = useState<Array<CommunityType>>();
  const [communityKindsCodeName, setCommunityKindsCodeName] = useState<Array<CommunityKindsCodeNameType>>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleCommunityData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCommunity({
        ...community,
        [name]: value
      });
  };

  const handleSunEditorData = (e: KeyboardEvent ) => {
    const target = (e.target as HTMLElement);
    setContents(target.innerHTML);
  };

  const valid = (): boolean => {
    if (!community.title.trim()) {
      alert("제목을 입력해주세요");
      titleRef.current && titleRef.current.focus();
      return false;
    } else if (!community.communityKindsCodeName.trim()) {
      alert("분류를 선택해주세요");
      communityKindsCodeNameRef.current && communityKindsCodeNameRef.current.focus();
      return false;
    } else if (!contents.trim() || !contents.replace(/(<([^>]+)>)/ig,"").trim()) {
      alert("내용을 입력해주세요");
      // editorRef.current && editorRef.current.;
      return false;
    }
    return true;
  }

  const handleComunityForm = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (valid() && window.confirm("정말로 등록하시겠습니까?")) {
      const url = `/api/community/?title=${community.title}&communityKindsCodeName=${community.communityKindsCodeName}&contents=${contents}`;
      console.log(url)
      API.post(url).then(response => {
        if (response.data.success) {
          alert(response.data.message);
          history.push("/community");
        }
      }).catch(error => {
        alert(error.response.data.message);
      });
    }
  };

  const handleComunityFormSaveTemp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (valid() && window.confirm("정말로 임시저장 하시겠습니까?")) {
      const url = `/api/community/?title=${community.title}&communityKindsCodeName=${community.communityKindsCodeName}&contents=${contents}&isTemp=true`;
      API.post(url).then(response => {
        if (response.data.success) {
          alert(response.data.message);
          history.push("/community");
        }
      }).catch(error => {
        alert(error.response.data.message);
      });
    }
  };

  useEffect(() => {
    (async () => {
      const url = `/api/community/communityKindsCodeName/`;
      await API.get(url).then(response => {
        const { communityKindsCodeNames } = response.data;
        setCommunityKindsCodeName(communityKindsCodeNames);
      });

      const getTempListUrl = `/api/community/isTemp/`;
      await API.get(getTempListUrl).then((response) => {
        if (response.data.success) {
          setTempCommunities(response.data.communities);
        }
      });
    })();
  }, []);

  return (
    <div css={communityFormStyle}>
      <form name="communityForm" id="communityForm" onSubmit={handleComunityForm}>
        <dl className="input-list">
          <dt><label htmlFor="title">제목</label></dt>
          <dd><input type="text" name="title" id="title" className="input-type-text" value={community.title} onChange={handleCommunityData} ref={titleRef} /></dd>
          <dt><label htmlFor="communityKindsCodeName">분류</label></dt>
          <dd>
            <select
              name="communityKindsCodeName"
              id="communityKindsCodeName"
              className="input-type-selectbox"
              onChange={handleCommunityData}
              ref={communityKindsCodeNameRef}
              value={community.communityKindsCodeName}>
              <option value="">분류</option>
              {
                communityKindsCodeName && communityKindsCodeName.map((item, index) => <option value={item.name} key={index}>{item.description}</option>)
              }
            </select>
          </dd>
          <dt><label htmlFor="isOpenY">내용</label></dt>
          <dd>
            <SunEditor
              lang="ko"
              ref={editorRef}
              name="contetns"
              setOptions={{
                height: 360,
                // buttonList: buttonList.complex
                buttonList: [
                  ["undo", "redo"], 
                  ["font", "fontSize", "formatBlock"], 
                  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                  ["removeFormat"],
                  ["fontColor", "hiliteColor"],
                  ["outdent", "indent"],
                  ["align", "horizontalRule", "list", "table"],
                  ["link", "image", "video"],
                  ["showBlocks", "codeView"],
                  ["preview"],
                ]
              }}
              onKeyDown={handleSunEditorData}
              setContents={community.contents}
              enableToolbar={true}
              showToolbar={true} />
          </dd>
        </dl>
        <div className="button-group">
          <button type="button" className="button left white">취소</button>
          <button type="submit" className="button right blue">저장</button>
          <button
            type="button"
            className="button right white"
            onClick={handleComunityFormSaveTemp}>임시저장</button>
          <button type="button" className="right link" onClick={() => { setModalIsOpen(true); }}>임시 저장 목록</button>
        </div>
      </form>
      <CommunityTempListModal
        contents={contents}
        modalIsOpen={modalIsOpen}
        tempCommunities={tempCommunities}
        onSetContents={setContents}
        onSetCommunity={setCommunity}
        onSetModalIsOpen={setModalIsOpen}
        onSetTempCommunities={setTempCommunities} />
    </div>
  );
};

const communityFormStyle = css`
  width: 58rem;
  margin: 0 auto;
  z-index: 800;
  position: relative;

  #communityForm {
    padding-top: 1.25rem;
    z-index: 900;

    .input-list {
      dt, dd {
        float: left;
        margin-bottom: 1.5rem;
      }
      
      dt {
        width: 12rem;
        font-weight: bold;
      }
  
      dd {
        margin-left: 0;
        width: 46rem;

        .input-type-text {
          width: calc(100% - 1.5rem);
          height: 1rem;
          padding: 0.5rem 0.75rem;
        }

        .input-type-selectbox {
          box-sizing: content-box;
          height: 1rem;
          padding: 0.5rem 0.75rem;
        }

        .input-textarea {
          width: calc(100% - 1.5rem);
          height: 10rem;
          padding: 0.5rem 0.75rem;
        }
      }
    }
  
    .button-group {
      button {
        &.button {
          padding: 0.725rem 1.5rem;
          background: none;
          border: 1px solid #ddd;
          outline: none;
          border-radius: 0.25rem;
        }

        &:hover {
          cursor: pointer;
        }

        &.blue {
          background: #005CB2;
          color: #FFFFFF;
          border: none;
        }

        &.white {
          background: #FFFFFF;
          border: 1px solid #ddd;
        }
        
        &.link {
          border: none;
          background: none;
          text-decoration: underline;
          color: blue;
          line-height: 2.699375rem;
        }

        &.left {
          float: left;
          margin-right: 0.725rem;
        }
        
        &.right {
          float: right;
          margin-left: 0.725rem;
        }
      }
      width: 100%;
    }
  }

  .sun-editor {
    .se-dialog-back {
      background: none;
    }
    .se-dialog-image, .se-dialog-content {
      position: absolute !important;
      top: 50%;
      // left: calc(50% - 11.5625rem);
      left: 50%;
      margin: 0;
      transform: translateX(-50%) translateY(-50%);
    }
  }
`;