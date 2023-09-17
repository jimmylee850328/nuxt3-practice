<template>
    <div class="pa-2">
        <v-row class="pa-2">
            <v-col
                cols="8"
                style="border: 1px solid #000"
            >
                <draggable
                    v-model="odd_items"
                    item-key="id"
                    class="v-row"
                >
                    <template #item="{ element, index }">
                        <v-col cols="6">
                            <v-card theme="dark">
                                <v-card-title>
                                    {{ element.title }}
                                </v-card-title>

                                <v-card-text>
                                    <h4>{{ element.contents }}</h4>
                                    <v-row
                                        v-if="element.hobbies"
                                        class="mt-2"
                                        align="center"
                                        no-gutters
                                    >
                                        <h4>興趣:</h4>
                                        <v-chip>
                                            {{ element.hobbies.name }}
                                        </v-chip>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-row no-gutters>
                                        <v-spacer />
                                        <v-icon
                                            class="mr-2"
                                            color="warning"
                                            @click="
                                                open_child_dialog(
                                                    element,
                                                    2 * index,
                                                    false
                                                )
                                            "
                                        >
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon
                                            color="info"
                                            @click="
                                                show_save_message(
                                                    element,
                                                    2 * index
                                                )
                                            "
                                        >
                                            mdi-content-save
                                        </v-icon>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </template>
                </draggable>
            </v-col>

            <v-col
                cols="4"
                style="border: 1px solid #000"
            >
                <draggable
                    v-model="even_items"
                    item-key="id"
                >
                    <template #item="{ element, index }">
                        <v-row>
                            <v-col cols="12">
                                <v-card theme="dark">
                                    <v-card-title>
                                        {{ element.title }}
                                    </v-card-title>

                                    <v-card-text>
                                        <h4>{{ element.contents }}</h4>
                                        <v-row
                                            v-if="element?.hobbies?.length"
                                            class="mt-2"
                                            align="center"
                                            no-gutters
                                        >
                                            <h4>興趣:</h4>
                                            <v-chip
                                                v-for="(
                                                    hobby, index
                                                ) in element.hobbies"
                                                :key="index"
                                            >
                                                {{ hobby.name }}
                                            </v-chip>
                                        </v-row>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-row no-gutters>
                                            <v-spacer />
                                            <v-icon
                                                class="mr-2"
                                                color="warning"
                                                @click="
                                                    open_child_dialog(
                                                        element,
                                                        2 * index + 1,
                                                        true
                                                    )
                                                "
                                            >
                                                mdi-pencil
                                            </v-icon>
                                            <v-icon
                                                color="info"
                                                @click="
                                                    show_save_message(
                                                        element,
                                                        1 + 2 * index
                                                    )
                                                "
                                            >
                                                mdi-content-save
                                            </v-icon>
                                        </v-row>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </draggable>
            </v-col>
        </v-row>
    </div>

    <child
        v-if="show_dialog"
        :parent_edit_item="current_item"
        :parent_multiple="current_multiple"
        @confirm_dialog="confirm_dialog"
        @cancel_dialog="cancel_dialog"
    />
</template>

<script setup>
    import { ref, reactive } from "vue";
    import Child from "./child.vue";
    import draggable from "vuedraggable";

    // data
    const show_dialog = ref(false);
    const card_items = reactive([]);
    Object.assign(card_items, [
        { title: "第一張卡片", contents: "一排只能三張卡片唷！", hobbies: null, index: 0 },
        { title: "第二張卡片", contents: "ㄏㄏㄏ", hobbies: null, index: 1 },
        { title: "第三張卡片", contents: "ＸＤＤＤ", hobbies: null, index: 2 },
        { title: "第四張卡片", contents: "今天天氣真好", hobbies: null, index: 3 },
        { title: "第五張卡片", contents: "亂講 明明就很糟", hobbies: null, index: 4 },
        { title: "第六張卡片", contents: "亂講 明明就很糟", hobbies: null, index: 5 },
        { title: "第七張卡片", contents: "亂講 明明就很糟", hobbies: null, index: 6 },
        { title: "第八張卡片", contents: "亂講 明明就很糟", hobbies: null, index: 7 },
        { title: "第九張卡片", contents: "亂講 明明就很糟", hobbies: null, index: 8 },
    ]);
    const current_item = ref({});
    const current_index = ref({});
    const current_multiple = ref({});

    const odd_items = ref(card_items.filter(x => (x.index + 1) % 2 == 1));
    const even_items = ref(card_items.filter(x => (x.index + 1) % 2 == 0));

    // functions
    const open_child_dialog = (item, index, multiple) => {
        current_item.value = item;
        current_index.value = index;
        current_multiple.value = multiple;
        show_dialog.value = true;
    };

    const confirm_dialog = (item) => {
        card_items[current_index.value] = item;
        let index = odd_items.value.findIndex(x => x.index === item.index);
        if (index > 0) {
            odd_items.value[index] = item;
        }
        else {
            index = even_items.value.findIndex(x => x.index === item.index);
            even_items.value[index] = item;
        }
        show_dialog.value = false;
    };

    const cancel_dialog = () => {
        show_dialog.value = false;
    };

    const show_save_message = (item, index) => {
        console.log(
            `您儲存的是第 ${index} 張卡片，卡片資訊為：title: ${item.title}, contents: ${item.contents}`
        );
    };
</script>

<style scoped></style>