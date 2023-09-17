<template>
    <v-dialog
        :model-value="true"
        width="650"
        persistent
    >
        <v-card>
            <v-card-title> Editing the item </v-card-title>

            <v-card-text>
                <v-text-field v-model="edit_item.title" />
                <v-textarea v-model="edit_item.contents" />
                <v-select
                    return-object
                    :multiple="parent_multiple"
                    :items="all_hobbies"
                    :chips="parent_multiple"
                    item-title="name"
                    item-value="id"
                    v-model="edit_item.hobbies"
                />
            </v-card-text>

            <v-card-actions>
                <v-row no-gutters>
                    <v-spacer />
                    <v-btn
                        flat
                        color="warning"
                        @click="cancel_dialog"
                    >
                        cancel
                    </v-btn>
                    <v-btn
                        flat
                        color="primary"
                        @click="confirm_dialog"
                    >
                        confirm
                    </v-btn>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref, reactive } from "vue";

    // props
    const props = defineProps({
        parent_edit_item: Object,
        parent_multiple: Boolean,
    });

    // data
    const all_hobbies = reactive([]);
    Object.assign(all_hobbies, [
        { value: "tennis", name: "打網球" },
        { value: "piano", name: "彈鋼琴" },
        { value: "game", name: "玩遊戲" },
        { value: "hiking", name: "爬山" },
    ]);
    
    const edit_item = ref({});
    edit_item.value = JSON.parse(JSON.stringify(props.parent_edit_item));

    // emit
    const emit = defineEmits(["confirm_dialog", "cancel_dialog"]);

    // functions
    const cancel_dialog = () => {
        emit("cancel_dialog");
    };

    const confirm_dialog = () => {
        emit("confirm_dialog", edit_item.value);
    };
</script>

<style scoped></style>