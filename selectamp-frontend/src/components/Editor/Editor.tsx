import { API } from '../axios';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export type EditorProps = {
  name: string,
  editorRef: string | ((instance: SunEditor | null) => void) | React.RefObject<SunEditor> | null | undefined,
  contents: string,
  onSetContents: (contents: string) => void;
};

export default function Editor({ name, editorRef, contents, onSetContents }: EditorProps) {
  const handleOnChageContents = (contents: string) => {
    onSetContents(contents);
  };

  const handleOnFilesUploadBefore = async (files: any, info: any, uploadHandler: any) => {
    let isUploadSuccess: boolean = false;

    try {
      if (!files.length || files.length > 1) uploadHandler("에러가 발생하였습니다\n 관리자에게 문의주시기 바랍니다");
      
      const form = new FormData();
      form.append('file', files[0])
      
      await API.post("/api/file/", form).then(async response => {
        if (response.data.success) {
          const result = {
            result: [{
              url: response.data.url,
              name: response.data.name,
              size: response.data.size
            }]
          };
          await uploadHandler(result);
          isUploadSuccess = true;
        }
      }).catch(error => {
        uploadHandler("이미지 업로드 중, 에러가 발생하였습니다");
      });
    } catch (error) { }
    
    return isUploadSuccess;
  };

  return (
    <SunEditor
      lang="ko"
      ref={editorRef}
      name={name}
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
      onChange={handleOnChageContents}
      onImageUploadBefore={handleOnFilesUploadBefore}
      onVideoUploadBefore={handleOnFilesUploadBefore}
      setContents={contents}
      enableToolbar={true}
      showToolbar={true} />
  );
};