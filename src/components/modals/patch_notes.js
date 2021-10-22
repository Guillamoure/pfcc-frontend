import React from "react";
import { getFetch } from "../../utils/fetches";

const PatchNotes = () => {
  const [notes, setNotes] = React.useEffect(null);
  React.useEffect(() => {
    getFetch("latest_patch_note").then(data => {
      setNotes(data);
    });
  });
  return <section>huh?</section>;
};

export default PatchNotes;
