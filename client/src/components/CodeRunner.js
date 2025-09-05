import React, { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

export default function CodeRunner({ codeFiles }) {
  const [output, setOutput] = useState("");
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const init = async () => {
      const webcontainer = await WebContainer.boot();
      setInstance(webcontainer);

      await webcontainer.mount(codeFiles);

      // Install deps
      const install = await webcontainer.spawn("npm", ["install"]);
      install.output.pipeTo(new WritableStream({
        write(data) {
          setOutput(prev => prev + data);
        }
      }));
      await install.exit;

      // Start project
      const start = await webcontainer.spawn("npm", ["run", "dev"]);
      start.output.pipeTo(new WritableStream({
        write(data) {
          setOutput(prev => prev + data);
        }
      }));
    };
    init();
  }, [codeFiles]);

  return (
    <div>
      <h3>WebContainer Output</h3>
      <pre>{output}</pre>
    </div>
  );
}
