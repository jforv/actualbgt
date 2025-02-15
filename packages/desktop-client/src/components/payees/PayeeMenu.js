import Delete from '../../icons/v0/Delete';
import Merge from '../../icons/v0/Merge';
import { theme } from '../../style';
import Menu from '../common/Menu';
import View from '../common/View';
import { Tooltip } from '../tooltips';

export default function PayeeMenu({
  payeesById,
  selectedPayees,
  onDelete,
  onMerge,
  onClose,
}) {
  // Transfer accounts are never editable
  let isDisabled = [...selectedPayees].some(
    id => payeesById[id] == null || payeesById[id].transfer_acct,
  );

  return (
    <Tooltip
      position="bottom"
      width={250}
      style={{ padding: 0 }}
      onClose={onClose}
    >
      <Menu
        onMenuSelect={type => {
          onClose();
          switch (type) {
            case 'delete':
              onDelete();
              break;
            case 'merge':
              onMerge();
              break;
            default:
          }
        }}
        footer={
          <View
            style={{
              padding: 3,
              fontSize: 11,
              fontStyle: 'italic',
              color: theme.pageTextSubdued,
            }}
          >
            {[...selectedPayees]
              .slice(0, 4)
              .map(id => payeesById[id].name)
              .join(', ') + (selectedPayees.size > 4 ? ', and more' : '')}
          </View>
        }
        items={[
          {
            icon: Delete,
            name: 'delete',
            text: 'Delete',
            disabled: isDisabled,
          },
          {
            icon: Merge,
            iconSize: 9,
            name: 'merge',
            text: 'Merge',
            disabled: isDisabled || selectedPayees.size < 2,
          },
          Menu.line,
        ]}
      />
    </Tooltip>
  );
}
