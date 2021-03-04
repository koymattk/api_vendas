import fs from 'fs';
import handlebars, { template } from 'handlebars';
import { string } from 'joi';

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

class HandlebarsMailTemplate {
    public async parse({
        file,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const tempalteFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(tempalteFileContent);

        return parseTemplate(variables);
    }
}

export default new HandlebarsMailTemplate();
