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
  const a: RawDraftContentState = {
    blocks: [
      {
        key: "m19k",
        text: "Bold text, Some link",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          { offset: 0, length: 9, style: "BOLD" },
          { offset: 11, length: 9, style: "ITALIC" },
        ],
        entityRanges: [{ offset: 11, length: 9, key: 0 }],
        data: {},
      },
    ],
    entityMap: {
      "0": {
        type: "LINK",
        mutability: "MUTABLE",
        data: {
          href:
            "hi>Italic text</a></i><br/ ><br />Other text<br /><br /><a href=",
          url:
            "http://0.0.0.0:9000/hi%3EItalic%20text%3C/a%3E%3C/i%3E%3Cbr/%20%3E%3Cbr%20/%3EOther%20text%3Cbr%20/%3E%3Cbr%20/%3E%3Ca%20href=",
        },
      },
    },
  };
  const contentState: ContentState = convertFromRaw(a)
  contentState
  console.log(data);
};

const LoadHTML = () => {
  return <MUIRichTextEditor defaultValue={content} onSave={save}  readOnly />;
};

export default LoadHTML;
