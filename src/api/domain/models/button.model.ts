import { AppDataSource } from "../../config/db";
import { Button } from "../entities/button.entities";
import { ButtonDto } from "../responseDto/response.dto";

const buttonRepoSitory = AppDataSource.getRepository(Button);

export const updateButtons = async (
buttons: ButtonDto[],
contentBlockId: number,
) => {
    try {
        // Delete existing buttons
        await buttonRepoSitory.delete({ content_block_id: contentBlockId });

        // Insert new buttons
        for (const button of buttons) {
        const newButton = new Button();
        newButton.content_block_id = contentBlockId;
        newButton.text = button.text;
        if(button.url) newButton.url = button.url;
        if(button.button_type) newButton.button_type = button.button_type;
        if(button.size) newButton.size = button.size;
        if(button.target) newButton.target = button.target;
        if(button.icon_class) newButton.icon_class = button.icon_class;
        await buttonRepoSitory.save(newButton);
        }
    } catch (error) {
        if(error instanceof Error){
            throw error.message
        }
    }
}