import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { API } from '../../axios';

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

export type CommunityKindsCodeNameType = {
  name: string,
  description: string
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
  const titleRef = useRef<HTMLInputElement>(null);
  const communityKindsCodeNameRef = useRef<HTMLSelectElement>(null);
  const contentsRef  = useRef<HTMLTextAreaElement>(null);
  const [communityKindsCodeName, setCommunityKindsCodeName] = useState<Array<CommunityKindsCodeNameType>>();

  useEffect(() => {
    const url = `/api/community/communityKindsCodeName/`;
    API.get(url).then(response => {
      const { communityKindsCodeNames } = response.data;
      setCommunityKindsCodeName(communityKindsCodeNames);
    });
  }, []);

  const handleCommunityData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCommunity({
        ...community,
        [name]: value
      });
  }

  const handleComunityForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!community.title.trim()) {
      alert("제목을 입력해주세요");
      titleRef.current && titleRef.current.focus();
    } else if (!community.communityKindsCodeName.trim()) {
      alert("분류를 선택해주세요");
      communityKindsCodeNameRef.current && communityKindsCodeNameRef.current.focus();
    } else if (!community.contents.trim()) {
      alert("내용을 입력해주세요");
      contentsRef.current && contentsRef.current.focus();
    } else {
      const url = `/api/community/?title=${community.title}&communityKindsCodeName=${community.communityKindsCodeName}&contents=${community.contents}`;
      API.post(url).then(response => {
        if (response.data.success) {
          alert(response.data.message);
        }
      }).catch(error => {
        alert(error.response.data.message);
      });
    }
  }

  return (
    <div css={communityFormStyle}>
       <form name="communityForm" id="communityForm" onSubmit={handleComunityForm}>
          <dl className="input-list">
            <dt><label htmlFor="title">Title</label></dt>
            <dd><input type="text" name="title" id="title" className="input-type-text" onChange={handleCommunityData} ref={titleRef} /></dd>
            <dt><label htmlFor="communityKindsCodeName">Kinds</label></dt>
            <dd>
              <select name="communityKindsCodeName" id="communityKindsCodeName" className="input-type-selectbox" onChange={handleCommunityData} ref={communityKindsCodeNameRef}>
                <option value="">Please Select</option>
                {
                  communityKindsCodeName && communityKindsCodeName.map((item, index) => <option value={item.name} key={index}>{item.description}</option>)
                }
              </select>
            </dd>
            <dt><label htmlFor="isOpenY">Contents</label></dt>
            {/* TODO: 에디터로 변경 */}
            <dd><textarea name="contents" id="contents" className="input-textarea" onChange={handleCommunityData} ref={contentsRef}></textarea></dd>
          </dl>
          <div className="button-group">
            <button type="button" className="left white">Cancel</button>
            <button type="submit" className="right blue">Save</button>
            <button type="button" className="right white">Save temp</button>
          </div>
        </form>
    </div>
  );
};

const communityFormStyle = css`
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