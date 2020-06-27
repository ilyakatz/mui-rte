import React from "react";
import {
  convertFromHTML,
  ContentState,
  RawDraftContentState,
  convertFromRaw,
} from "draft-js";
import MUIRichTextEditor from "../../";
import { EditorState, convertToRaw } from "draft-js";

const sampleMarkup =
  '<b>Bold text</b>, <i><a href="hi>Italic text</a></i><br/ ><br />Other text<br /><br /><a href="http://myurl.com">Some link</a>';
const contentHTML = convertFromHTML(sampleMarkup);
const state: ContentState = ContentState.createFromBlockArray(
  contentHTML.contentBlocks,
  contentHTML.entityMap
);
const content = JSON.stringify(convertToRaw(state));
console.log("Content is ");
console.log(content);
console.log("plaintext is " + state.getPlainText());

const storeRaw = localStorage.getItem('draftRaw');

let initialEditorState =null;
if (storeRaw) {
  const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
  initialEditorState = EditorState.createWithContent(rawContentFromStore);
} else {
  initialEditorState = EditorState.createEmpty();
}
//////
const raw: RawDraftContentState = convertToRaw(state);
console.log("Raw is " + JSON.stringify(raw));
//////
/// save to db
///////
const text = convertFromRaw(raw);
console.log("Text is " + text);

// https://medium.com/@rajaraodv/how-draft-js-represents-rich-text-data-eeabb5f25cf2#9260

const save = (data: string) => {
  localStorage.setItem('draftRaw', data);
  console.log(data);
};

const LoadHTML = () => {
  return (
    <>
      <MUIRichTextEditor defaultValue={content} onSave={save} />
      <hr></hr>
      <MUIRichTextEditor
        defaultValue={initialEditorState}
        onSave={save}
        readOnly
        controls={[]}
      />
    </>
  );
};

export default LoadHTML;
