<template>
  <span ref="svg" v-html="SVG" />
</template>

<script setup lang="ts" generic="T">
import { computed, Ref, ref, UnwrapRef } from "vue";

interface Props {
  icon: string;
  dir: string;
  stroke?: string;
  circleStroke?: string;
  fill?: string;
  height?: number;
  width?: number;
  number?: number;
  pathFill?: string;
  pathClass?: string[] | object[] | string | object;
  svgClass?: string[] | object[] | string | object;
  circleFill?: string;
  circleClass?: string[] | object[] | string | object;
}

const props = defineProps<Props>();

const DIR = "/assets/icons";
// NOTE: meta.glob uses a known string literal and doesn't accept defined variables
const iconModule = computed(() => {
  return import.meta.glob("~/assets/icons/**", {
    as: "raw",
    eager: true,
  });
});

// Get the icon from the folder
const Icon = computed<string>(() => {
  const resource =
    props.dir !== undefined ? `/assets/icons/${props.dir}/` : DIR;
  return iconModule.value[`${resource}${props.icon}.svg`];
});

const SVG = ref<string>();
const addAttr = (
  itemList: HTMLCollectionOf<SVGCircleElement | SVGPathElement>,
  props: { attrClass: string; stroke: string; pathFill: string }
) => {
  for (let i = 0; i < itemList.length; i++) {
    props.attrClass &&
      itemList[i].setAttribute("class", props.attrClass.toString());
    if (props.stroke) {
      itemList[i].setAttribute("stroke", props.stroke);
      itemList[i].setAttribute("fill", "none");
    }

    if (props.pathFill) {
      itemList[i].setAttribute("fill", props.pathFill);
      itemList[i].setAttribute("stroke", "none");
    }
  }
};

const createIcon = () => {
  const parser = new DOMParser();
  // Convert icon from text to a valid html
  const el = parser.parseFromString(Icon.value, "text/html");
  //	Make sure it works along with vue ways of index components
  const svg: Ref<UnwrapRef<SVGSVGElement>> = ref(
    el.getElementsByTagName("svg")[0]
  );

  // Set the properties of the icon
  props.height && svg.value?.setAttribute("height", props.height.toString());
  props.width && svg.value?.setAttribute("width", props.width.toString());
  props.fill && svg.value?.setAttribute("fill", props.fill);
  props.svgClass && svg.value?.setAttribute("class", props.svgClass.toString());

  // Get path from the svg files
  const svgPath = svg.value?.getElementsByTagName("path");
  const svgCircle = svg.value?.getElementsByTagName("circle");
  if (!svgPath || !svgCircle) {
    return null;
  }
  // Add values from the props to the el prop
  if (svgCircle) {
    addAttr(svgCircle, {
      attrClass: props.circleClass as unknown as string,
      pathFill: props.circleFill as string,
      stroke: props.circleStroke as string,
    });
  }
  if (svgPath.length) {
    addAttr(svgPath, {
      attrClass: props.pathClass as unknown as string,
      pathFill: props.pathFill as string,
      stroke: props.stroke as string,
    });
  }

  // Convert the svg file back to text in order to render as html in vue
  const stringify = new XMLSerializer();
  SVG.value = stringify.serializeToString(svg.value);
};

onBeforeMount(() => {
  createIcon();
});

watchEffect(createIcon);
</script>
