import { t } from '@lingui/macro';
import {
  ExpandableRowContent,
  TableComposable,
  Tbody,
  Td,
  Tr,
} from '@patternfly/react-table';
import React, { useState } from 'react';
import { SortTable } from 'src/components';

interface Props {
  params?: object;
  updateParams?: (params) => void;
  isCompact?: boolean;
  tableHeader?: {
    headers: {
      title: string;
      type: string;
      id: string;
    }[];
  };
  isStickyHeader?: boolean;
}

export const RoleListTable: React.FC<Props> = ({
  children,
  params,
  updateParams,
  isCompact,
  tableHeader,
  isStickyHeader = false,
}) => {
  const defaultTableHeader = {
    headers: [
      {
        title: '',
        type: 'none',
        id: 'expander',
      },
      {
        title: t`Role`,
        type: 'alpha',
        id: 'role',
      },
      {
        title: t`Description`,
        type: 'none',
        id: 'description',
      },
      {
        title: t`Editable`,
        type: 'none',
        id: 'locked',
      },
      {
        title: '',
        type: 'none',
        id: 'kebab',
      },
    ],
  };

  return (
    <TableComposable
      aria-label='role-list-table'
      data-cy='RoleListTable'
      variant={isCompact ? 'compact' : undefined}
      isStickyHeader={isStickyHeader}
    >
      <SortTable
        options={tableHeader ?? defaultTableHeader}
        params={params}
        updateParams={updateParams}
      />
      {children}
    </TableComposable>
  );
};

export const ExpandableRow: React.FC<{
  rowIndex: number;
  expandableRowContent?: React.ReactNode;
  colSpan?: number;
  'data-cy'?: string;
}> = ({ rowIndex, children, expandableRowContent, colSpan, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Tbody isExpanded={isExpanded}>
      <Tr data-cy={props['data-cy']}>
        <Td
          expand={{
            onToggle: () => setIsExpanded(!isExpanded),
            isExpanded,
            rowIndex,
          }}
        />
        {children}
      </Tr>
      {expandableRowContent && (
        <Tr isExpanded={isExpanded}>
          <Td colSpan={colSpan ?? 4}>
            {isExpanded && (
              <ExpandableRowContent>
                {expandableRowContent}
              </ExpandableRowContent>
            )}
          </Td>
        </Tr>
      )}
    </Tbody>
  );
};

export const CheckboxRow: React.FC<{
  rowIndex?: number;
  isSelected: boolean;
  onSelect: (value) => void;
  isDisabled?: boolean;
  'data-cy'?: string;
}> = ({ rowIndex, children, isSelected, onSelect, isDisabled, ...props }) => (
  <Tbody>
    <Tr data-cy={props['data-cy']}>
      <Td
        select={{
          disable: isDisabled,
          variant: 'checkbox',
          rowIndex,
          onSelect,
          isSelected,
        }}
      />
      {children}
    </Tr>
  </Tbody>
);

export const RadioRow: React.FC<{
  rowIndex?: number;
  isSelected: boolean;
  onSelect: (value) => void;
  isDisabled?: boolean;
  'data-cy'?: string;
}> = ({ rowIndex, children, isSelected, onSelect, isDisabled, ...props }) => (
  <Tbody>
    <Tr data-cy={props['data-cy']}>
      <Td
        select={{
          disable: isDisabled,
          variant: 'radio',
          rowIndex,
          onSelect,
          isSelected,
        }}
      />
      {children}
    </Tr>
  </Tbody>
);
