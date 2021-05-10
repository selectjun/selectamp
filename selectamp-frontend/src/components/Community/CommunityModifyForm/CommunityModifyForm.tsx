import { css } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import SunEditor, { buttonList } from 'suneditor-react';
import { API } from '../../axios';

export type CommunityKindsCodeType = {
  name: string,
  description?: string
};

export type CommunityType = {
  id?: number,
  communityKindsCode: CommunityKindsCodeType,
  title: string,
  contents: string,
  viewCount?: number,
  isTemp: boolean,
  userId: string,
  createAt: Date | undefined,
  updateAt: Date | undefined
};

export type CommunityUpdateFormProps = {
  id: string
};

export default function CommunityModifyForm({ id }: CommunityUpdateFormProps) {
  const history = useHistory();
  const titleRef = useRef<HTMLInputElement>(null);
  const communityKindsCodeNameRef = useRef<HTMLSelectElement>(null);
  const contentsRef  = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<SunEditor>(null);

  const [community, setCommunity] = useState<CommunityType>();
  const [contents, setContents] = useState<string>("");
  const [communityKindsCodeName, setCommunityKindsCodeName] = useState<Array<CommunityKindsCodeType>>();

  useEffect(() => {
    (async function asyncWarapper() {
      const getCommunityKindsCodeUrl = `/api/community/communityKindsCodeName/`;
      await API.get(getCommunityKindsCodeUrl).then(response => {
        const { communityKindsCodeNames } = response.data;
        setCommunityKindsCodeName(communityKindsCodeNames);
      });

      const getCommunityUrl = `/api/community/${id}/`;
      API.get(getCommunityUrl).then(response => {
        if (response.data.success) {
          setCommunity(response.data.community);
          setContents(response.data.community.contents);
        }
      });
    })();
  }, []);

  const handleCancelButton = (): void => {
    if (window.confirm("정말로 수정을 취소하시겠습니까?")) {
      history.goBack();
    }
  }

  const handleCommunityKindsCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    community && setCommunity({
      ...community,
      communityKindsCode: {
        name: target.value,
        description: target.options[target.selectedIndex].text
      }
    });
  }

  const handleCommunityData = (e: React.ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      community && setCommunity({
        ...community,
        [name]: value
      });
  };

  const handleSunEditorData = (e: KeyboardEvent ) => {
    const target = (e.target as HTMLElement);
    setContents(target.innerHTML);
  };

  const handleComunityForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (community === undefined) {
      return false;
    } else if (!community.title.trim()) {
      alert("제목을 입력해주세요");
      titleRef.current && titleRef.current.focus();
    } else if (!community.communityKindsCode.name.trim()) {
      alert("분류를 선택해주세요");
      communityKindsCodeNameRef.current && communityKindsCodeNameRef.current.focus();
    } else if (!community.contents.trim()) {
      alert("내용을 입력해주세요");
      contentsRef.current && contentsRef.current.focus();
    } else if (window.confirm("정말로 수정하시겠습니까?")) {
      const url = `/api/community/${id}/?title=${community.title}&communityKindsCodeName=${community.communityKindsCode.name}&contents=${contents}`;
      API.put(url).then(response => {
        if (response.data.success) {
          alert(response.data.message);
          history.push("/community");
        }
      }).catch(error => {
        alert(error.response.data.message);
      });
    }
  }

  return (
    community
    ? <div css={communityModifyFormStyle}>
       <form name="communityForm" id="communityForm" onSubmit={handleComunityForm}>
          <dl className="input-list">
            <dt><label htmlFor="title">제목</label></dt>
            <dd><input type="text" name="title" id="title" className="input-type-text" onChange={handleCommunityData} ref={titleRef} value={community.title} /></dd>
            <dt><label htmlFor="communityKindsCodeName">분류</label></dt>
            <dd>
              <select
                name="communityKindsCodeName"
                id="communityKindsCodeName"
                className="input-type-selectbox"
                onChange={handleCommunityKindsCode}
                ref={communityKindsCodeNameRef}
                defaultValue={community.communityKindsCode.name}>
                <option value="">분류</option>
                {
                  communityKindsCodeName && communityKindsCodeName.map((item, index) => <option value={item.name} key={index}>{item.description}</option>)
                }
              </select>
            </dd>
            <dt><label htmlFor="isOpenY">내용</label></dt>
            {/* TODO: 에디터로 변경 */}
            <dd>
              {/* <textarea name="contents" id="contents" className="input-textarea" onChange={handleCommunityData} ref={contentsRef} defaultValue={community.contents}></textarea> */}
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
                setContents={contents}
                enableToolbar={true}
                showToolbar={true} />
            </dd>
          </dl>
          <div className="button-group">
            <button type="button" className="left white" id="cancelButton"onClick={handleCancelButton}>취소</button>
            <button type="submit" className="right blue">저장</button>
          </div>
        </form>
    </div>
    : null
  );
};

const communityModifyFormStyle = css`
  width: 58rem;
  margin: 0 auto;

  #communityForm {
    padding-top: 1.25rem;

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
        padding: 0.725rem 1.5rem;
        background: none;
        border: 1px solid #ddd;
        outline: none;
        border-radius: 0.25rem;

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
`;