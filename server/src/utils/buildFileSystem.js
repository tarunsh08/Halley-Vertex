export function buildFileSystem(filesJson){
    const convert = (obj) => {
        const fsObj = {};
        for (const [key, value] of Object.entries(obj)){
            if(value.contents !== undefined) {
                fsObj[key] = {
                    file: {
                        contents: value.contents
                    }
                }
            }else{
                fsObj[key] = {
                    directory: convert(value)
                }
            }
        }
        return fsObj;
    }
    return convert(filesJson);
}