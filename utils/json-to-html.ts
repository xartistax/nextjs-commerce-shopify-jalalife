import { Content, HeadingNode, LinkNode, ListNode, Paragraph, TextNode } from 'lib/shopify/types';

export function toHTML(content: string): string {
  let parsed: Content;

  try {
    parsed = JSON.parse(content);
  } catch (error) {
    console.error('Failed to parse content:', error);
    return '';
  }

  let html = '';

  parsed.children.forEach((node) => {
    switch (node.type) {
      case 'heading':
        if ((node as HeadingNode).children && (node as HeadingNode).children.length > 0) {
          html += `<h${(node as HeadingNode).level}>${(node as HeadingNode).children[0]!.value}</h${(node as HeadingNode).level}>`;
        }
        break;

      case 'list':
        const listTag = (node as ListNode).listType === 'unordered' ? 'ul' : 'ol';
        html += `<${listTag}>`;

        (node as ListNode).children.forEach((item) => {
          if (item.children && item.children.length > 0) {
            html += `<li>${item.children[0]!.value}</li>`;
          }
        });

        html += `</${listTag}>`;
        break;

      case 'paragraph':
        html += '<p>';

        (node as Paragraph).children.forEach((item) => {
          if (item.type === 'text') {
            if ((item as TextNode).bold) {
              html += `<strong>${item.value}</strong> `;
            } else if ((item as TextNode).italic) {
              html += `<em>${item.value}</em> `;
            } else {
              html += `${item.value} `;
            }
          } else if (item.type === 'link' ?? item.children.length > 0) {
            const linkContent = item.children && item.children.length > 0 ? item.children[0]!.value : '';
            if ((item as LinkNode).bold) {
              html += `<a href="${item.url}" target="${item.target}"><strong>${linkContent}</strong></a> `;
            } else if ((item as LinkNode).italic) {
              html += `<a href="${item.url}" target="${item.target}"><em>${linkContent}</em></a> `;
            } else {
              html += `<a href="${item.url}" target="${item.target}">${linkContent}</a> `;
            }
          }
        });

        html += '</p>';
        break;
    }
  });

  return html;
}
